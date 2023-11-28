import Link from "@easy-kit/common/components/link";
import { PropsWithChildren, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export interface LoginLinkProps extends PropsWithChildren {
    href: string,
}

const LoginLink = (props: LoginLinkProps) => {
    const params = useSearchParams();
    const from = params.get("from");

    const href = useMemo(() => {
        if(from) {
            return `${props.href}?from=${encodeURIComponent(from)}`;
        }
        return props.href;
    }, [from, props.href])

    return <Link href={href}>{props.children}</Link>
};

export default LoginLink;
