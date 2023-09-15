import { Dropdown, Input } from "antd";
import React, { useState } from "react";
import _ from "lodash";

const DropdownInput = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onChange = _.debounce((e: any) => {
    const { value } = e?.target;
    const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
    console.log("输入变化了", !reg.test(value));

    if (!reg.test(value)) {
      console.log("报错了");

      setOpen(true);
    } else {
      setOpen(false);
    }
  }, 300);

  return (
    <Dropdown
      overlay={
        <div style={{ background: "#fff" }}>请输入中英文数字及下划线</div>
      }
      open={open}
      // onOpenChange={(e) => setOpen(e)}
    >
      <Input
        onChange={(e) => {
          e?.persist();
          onChange(e);
        }}
        style={{ width: 272, borderColor: open ? "red" : "" }}
      />
    </Dropdown>
  );
};
export default DropdownInput;
