import {Action, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@easykit/design";
import {IconApps} from "@arco-iconbox/react-clover";
import {useState} from "react";
import {AppsLoading} from "@clover/public/components/layout/main/header/apps/loading";
import {AppsItem} from "@clover/public/components/layout/main/header/apps/item";
import {useAppsLoader} from "@clover/public/hooks/use.apps.loader";

export const Apps = () => {
  const [open, setOpen] = useState(false);
  const {loading, apps} = useAppsLoader();

  return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
      <Action className={"!outline-none"} active={open}>
        <IconApps/>
      </Action>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={"start"} className={"p-4 w-96"}>
      {
        loading ?
          <AppsLoading/> :
          <div className={"space-y-2"}>
            {apps.map((app, index) => <AppsItem key={index} {...app}/>)}
          </div>
      }
    </DropdownMenuContent>
  </DropdownMenu>
}
