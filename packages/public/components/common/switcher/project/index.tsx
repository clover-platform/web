import {FC, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Dialog, Form, FormItem} from "@easykit/design";
import {t} from "@clover/public/locale";
import {TeamSelector} from "@clover/public/components/common/selector/team";
import * as z from "zod";
import {ProjectSelector} from "@clover/public/components/common/selector/project";
import {UseFormReturn} from "react-hook-form";

export const getSchema = () => z.object({
  teamId: z.string(),
  projectId: z.string(),
})

export type ProjectSwitcherProps = PropsWithChildren<{
  className?: string;
  onSuccess?: () => void;
  asChild?: boolean;
  title: string;
  teamId: number;
  projectId?: number;
}>

export const ProjectSwitcher: FC<ProjectSwitcherProps> = (props) => {
  const {
    title,
    asChild = false, children, className,
  } = props;
  const [open, setOpen] = useState(false);
  const [teamId, setTeamId] = useState<number|string>(props.teamId);
  const formRef = useRef<UseFormReturn>(null);

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, [])

  useEffect(() => {
    formRef.current?.setValue("projectId", undefined);
  }, [teamId]);

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
    >
      <Form
        ref={formRef}
        schema={getSchema()}
        onSubmit={onSubmit}
        // defaultValues={defaultValues}
        onValuesChange={(v) => {
          setTeamId(v.teamId);
          console.log(v);
        }}
      >
        <FormItem name="teamId" label={t("团队")}>
          <TeamSelector className={"w-full"}/>
        </FormItem>
        <FormItem name="projectId" label={t("项目")}>
          <ProjectSelector teamId={teamId} className={"w-full"} />
        </FormItem>
      </Form>
    </Dialog>
  </span>
}
