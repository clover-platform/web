import {FC, PropsWithChildren, useState} from "react";
import {Button, Dialog, Form, FormItem} from "@easykit/design";
import {tt} from "@clover/public/locale";
import {TeamSelector} from "@clover/public/components/common/selector/team";
import * as z from "zod";
import {ProjectSelector} from "@clover/public/components/common/selector/project";
import classNames from "classnames";
import {change} from "@clover/public/rest/team";
import {useFormSubmit} from "@clover/public/hooks/use.form.submit";
import {useStateLoader} from "@clover/public/components/layout/hooks/use.state.loader";

export const getSchema = () => z.object({
  teamId: z.string()
    .min(1, tt("请选择团队")),
  projectId: z.string()
    .min(1, tt("请选择项目")),
})

export type ProjectSwitcherProps = PropsWithChildren<{
  className?: string;
  onSuccess?: () => void;
  title: string;
  teamId?: number;
  projectId?: number;
}>

export const ProjectSwitcher: FC<ProjectSwitcherProps> = (props) => {
  const {
    title,
    children,
    className,
    projectId,
    teamId,
    onSuccess
  } = props;
  const [open, setOpen] = useState(false);
  const [teamIdValue, setTeamIdValue] = useState<string|number|undefined>(teamId);
  const loader = useStateLoader();
  const {ref, onSubmit, submitting} = useFormSubmit({
    action: change,
    onSuccess: () => {
      onSuccess?.();
      setOpen(false);
      loader().then();
    }
  })

  return <div
    className={classNames("w-full", className)}
    onClick={(e) => {
      e.stopPropagation();
      setOpen(true);
    }}
  >
    {children}
    <Dialog
      title={title}
      visible={open}
      onCancel={() => setOpen(false)}
      className={"w-96"}
    >
      <Form
        ref={ref}
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
              ref.current?.setValue("projectId", "");
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
        <Button
          loading={submitting}
          type={"submit"}
          className={"w-full"}
        >
          {tt("切换")}
        </Button>
      </Form>
    </Dialog>
  </div>
}
