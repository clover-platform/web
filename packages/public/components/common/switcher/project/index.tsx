import {FC, PropsWithChildren, useState} from "react";
import {Dialog} from "@easykit/design";

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
    asChild = false, children, className
  } = props;
  const [open, setOpen] = useState(false);
  return <span
    onClick={(e) => {
      console.log('open project switcher');
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
      选择团队
    </Dialog>
  </span>
}
