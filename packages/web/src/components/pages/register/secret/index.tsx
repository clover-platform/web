import { Form, FormItemProps } from "@arco-design/web-react";

const SecretItem = (props: FormItemProps) => {
    return <Form.Item label={"{#身份验证 App 密钥#}"}>
        密钥
    </Form.Item>
};

export default SecretItem;
