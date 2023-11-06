import { Button, Input, InputProps, Message } from "@arco-design/web-react";
import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { isEmail } from "@clover/common/utils";
import { i18n } from '@clover/i18n/utils';

interface EmailCodeInputProps extends InputProps {
    api: Function;
    email: string;
}

const EmailCodeInput = (props: EmailCodeInputProps) => {
    const {
        api = () => {},
        email = "",
        onChange = (v: string, e: any) => {},
        ...rest
    } = props;

    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [time, setTime] = useState(60);
    const timeRef = useRef(60);
    const timerRef = useRef(0);

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        }
    }, []);

    const startTimer = () => {
        setWaiting(true);
        timerRef.current = window.setInterval(() => {
            const next = timeRef.current - 1;
            if(next === 0) {
                clearInterval(timerRef.current);
                setWaiting(false);
                timeRef.current = 60;
                setTime(60)
                return;
            }
            timeRef.current = next;
            setTime(next);
        }, 1000);
    };

    const sendCode = useCallback(async () => {
        setLoading(true);
        const { success, message } = await api();
        setLoading(false);
        if(success) {
            startTimer();
        }else{
            Message.error(message);
        }
    }, [api]);

    const buttonDisabled = useMemo(() => {
        return !isEmail(email) || loading || waiting
    }, [email, loading, waiting])

    const buttonText = useMemo(() => {
        return waiting ?  i18n("{#%time秒后重发#}", {time}): "{#发送验证码#}";
    }, [waiting, time])

    const handleChange = (v: string) => {
        onChange(v ? v.replace(/[^\d]/g, '') : v, null);
    }

    return <div className={"flex justify-center items-center"}>
        <Input
            className={"flex-1"} {...rest}
            onChange={handleChange}
            maxLength={6}
        />
        <Button
            loading={loading}
            disabled={buttonDisabled}
            className={"ml-[10px]"}
            onClick={sendCode}
        >
            {buttonText}
        </Button>
    </div>
};

export default EmailCodeInput;
