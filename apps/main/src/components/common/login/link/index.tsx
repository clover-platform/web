import Link from "@clover/public/components/common/link";
import {PropsWithChildren, useMemo} from "react";
import {useSearchParams} from "next/navigation";

export interface LoginLinkProps extends PropsWithChildren {
  href: string,
  tabIndex?: number,
}

const LoginLink = (props: LoginLinkProps) => {
  const params = useSearchParams();
  const redirect = params.get("redirect");

  const href = useMemo(() => {
    if (redirect) {
      return `${props.href}?redirect=${encodeURIComponent(redirect)}`;
    }
    return props.href;
  }, [redirect, props.href])

  return <Link {...props} href={href}>{props.children}</Link>
};

export default LoginLink;
