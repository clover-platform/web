import { Command, CommandInput, CommandItem, CommandList, SheetClose } from "@easykit/design";
import { CheckIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { branchesState, currentBranchState, currentEntryState } from "@/state/worktop";
import { useTranslation } from "react-i18next";
export const MenuBranchSheet = () => {
  const [branches] = useAtom(branchesState);
  const [current, setCurrent] = useAtom(currentBranchState);
  const [, setCurrentEntry] = useAtom(currentEntryState);
  const { t } = useTranslation();

  return <div className={"space-y-2"}>
    <div className={"text-xl font-bold"}>{t("分支")}</div>
    <Command className={"h-auto"}>
      <CommandInput className={"h-8"} placeholder={t("请输入关键词")} />
      <SheetClose>
        <CommandList className={"p-0 mt-2 text-left"}>
          <CommandItem key={'all'} onSelect={() => {
            setCurrentEntry(0);
            setCurrent('');
          }}>
            <div className={"flex justify-center items-center w-full"}>
              <span className={"flex-1"}>{t("所有分支")}</span>
              {'' === current ? <CheckIcon /> : null}
            </div>
          </CommandItem>
          {
            branches.map((item: any) => {
              return <CommandItem key={item.id} onSelect={() => {
                setCurrentEntry(0);
                setCurrent(item.name);
              }}>
                <div className={"flex justify-center items-center w-full"}>
                  <span className={"flex-1"}>{item.name}</span>
                  {item.name === current ? <CheckIcon /> : null}
                </div>
              </CommandItem>
            })
          }
        </CommandList>
      </SheetClose>
    </Command>
  </div>
}
