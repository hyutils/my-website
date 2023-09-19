import { Dropdown, Input } from "antd";
import React, { useEffect, useState } from "react";
import _ from "lodash";

const DropdownInput = (props: {
  errorInfo?: string;
  value?: string;
  onChange?: (v: string) => void;
}) => {
  const { errorInfo, onChange } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("请输入中英文数字及下划线");

  useEffect(() => {
    if (errorInfo) setErrorText(errorInfo);
  }, [errorInfo]);

  /** 监听输入报错 */
  const handleChange = _.debounce((e: any, isSure = false) => {
    const { value } = e?.target;
    const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
    console.log("输入变化了", !reg.test(value));

    if (!reg.test(value)) {
      setOpen(true);
    } else {
      setOpen(false);
      onChange?.(value);
    }
  }, 300);

  return (
    <Dropdown
      overlay={
        <div
          style={{
            background: "#fff",
            padding: "8px 12px",
            height: 20,
            boxShadow: "0px 2px 12px 0px rgba(0,0,0,0.06)",
          }}
        >
          {errorText}
        </div>
      }
      open={open}
      // onOpenChange={(e) => setOpen(e)}
    >
      <Input
        onChange={(e) => {
          e?.persist();
          handleChange(e);
        }}
        onBlur={(e) => {
          !open && onChange?.(e?.target?.value);
        }}
        onPressEnter={(e: any) => {
          !open && onChange?.(e?.target?.value);
        }}
        style={{ width: 272, borderColor: open ? "red" : "" }}
      />
    </Dropdown>
  );
};
export default DropdownInput;
