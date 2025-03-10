import {FC, PropsWithChildren, useCallback, useRef, useState} from "react";
import {Button, Dialog, Form, FormItem} from "@easykit/design";
import {tt} from "@clover/public/locale";
import {TeamSelector} from "@clover/public/components/common/selector/team";
import * as z from "zod";
import {ProjectSelector} from "@clover/public/components/common/selector/project";
import {UseFormReturn} from "react-hook-form";

export const getSchema = () => z.object({
  teamId: z.string()
    .min(1, tt("请选择团队")),
  projectId: z.string()
    .min(1, tt("请选择项目")),
})

export type ProjectSwitcherProps = PropsWithChildren<{
  className?: string;
  onSuccess?: () => void;
  asChild?: boolean;
  title: string;
  teamId?: number;
  projectId?: number;
}>

export const ProjectSwitcher: FC<ProjectSwitcherProps> = (props) => {
  const {
    title,
    asChild = false, children, className,
    projectId,
    teamId
  } = props;
  const [open, setOpen] = useState(false);
  const formRef = useRef<UseFormReturn>(null);
  const [teamIdValue, setTeamIdValue] = useState<string|number|undefined>(teamId);

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, [])

  return <span
    onClick={(e) => {
      e.stopPropagation();
      setOpen(true);
    }}
  >
    {
      asChild ? children : <button className={className}>
        {children}
      </button>
    }
    <Dialog
      title={title}
      visible={open}
      onCancel={() => setOpen(false)}
      className={"w-96"}
    >
      <Form
        ref={formRef}
        schema={getSchema()}
        onSubmit={onSubmit}
        defaultValues={{
          projectId: projectId ? `${projectId}` : "",
          teamId: teamId ? `${teamId}` : "",
        }}
      >
        <FormItem name="teamId" label={tt("团队")}>
          <TeamSelector
            onChange={(v) => {
              formRef.current?.setValue("projectId", "");
              setTeamIdValue(v);
            }}
            className={"w-full"}
          />
        </FormItem>
        <FormItem name="projectId" label={tt("项目")}>
          <ProjectSelector
            teamId={teamIdValue!}
            className={"w-full"}
          />
        </FormItem>
        <Button type={"submit"} className={"w-full"}>{tt("切换")}</Button>
      </Form>
    </Dialog>
  </span>
}
