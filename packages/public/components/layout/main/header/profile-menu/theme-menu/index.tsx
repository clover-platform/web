import {
  DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@easykit/design";
import {useTheme} from "next-themes";
import {tt} from "@clover/public/locale";

export const ThemeMenu = () => {
  const {theme, setTheme} = useTheme();
  return <DropdownMenuSub>
    <DropdownMenuSubTrigger>{tt("主题设置")}</DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuLabel className={"text-secondary-foreground/50"}>{tt("主题设置")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">{tt("浅色")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{tt("深色")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">{tt("跟随系统")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
}
