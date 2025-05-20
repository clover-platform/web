import { FC, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@easykit/design";
import classNames from "classnames";
import { FormatConfigButton } from "@/components/pages/bundle/form/export-format/config/button";
import { ExportFormatConfig, getSupportedFormats } from "@/config/pages/bundle/config";

export type ExportFormatValue = {
  format: string;
  config?: any;
}

export type ExportFormatProps = {
  value?: ExportFormatValue;
  onChange?: (value: ExportFormatValue) => void;
};

export const ExportFormat: FC<ExportFormatProps> = (props) => {
  const { value: v } = props;
  const [value, setValue] = useState<ExportFormatValue>(v!);
  const [formats, setFormats] = useState<ExportFormatConfig[]>(getSupportedFormats().map(f => ({ ...f, config: f.configDefault })));

  return <div className={"bg-white dark:bg-secondary rounded-md border"}>
    <RadioGroup
      value={value?.format}
      onValueChange={(v) => {
        const format = formats.find(f => f.id === v);
        const newValue = { ...value, config: format?.config, format: v };
        setValue(newValue);
        props.onChange?.(newValue);
      }}
      className={"gap-0"}
    >
      {
        formats.map(format => {
          return <label key={format.id} className={classNames(
            "flex items-center border-b p-2",
            "border-b last:border-b-0 first:rounded-t-md last:rounded-b-md",
            value?.format === format.id ? "bg-muted" : null,
          )}>
            <div className={"w-8 h-8 flex items-center justify-center"}>
              <RadioGroupItem value={format.id} />
            </div>
            <div className={"w-10 h-8 flex items-center justify-center"}>
              {format.icon}
            </div>
            <div className={"flex-1 ml-2"}>
              <div className={"text"}>{format.name}</div>
              <div className={"text-sm text-muted-foreground"}>{format.id}</div>
            </div>
            {
              format.configComponent ? <FormatConfigButton
                onChange={(config) => {
                  const newFormats = formats.map(f => {
                    if (f.id === format.id) {
                      f.config = config;
                    }
                    return f;
                  });
                  setFormats(newFormats);
                  const newValue = { ...value, config };
                  setValue(newValue);
                  props.onChange?.(newValue);
                }}
                config={format}
              /> : null
            }
          </label>
        })
      }
    </RadioGroup>
  </div>
}
