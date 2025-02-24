import {Avatar} from "@easykit/design";
import {useAtomValue} from "jotai";
import {accountInfoState} from "@clover/public/state/account";

export const AccountInfo = () => {
  const account = useAtomValue(accountInfoState);
  return <div className={"flex justify-center items-center space-x-3 p-2"}>
    <Avatar src={"/assets/main/image/default/avatar.png"} alt={"cover"}/>
    <div className={"flex-1"}>
      <div className={"text-lg"}>{account.username}</div>
      <div className={"text-md text-secondary-foreground/50"}>{account.email}</div>
    </div>
  </div>
}
