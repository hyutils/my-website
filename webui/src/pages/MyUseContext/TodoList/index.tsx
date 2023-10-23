import React, { useRef } from "react";
import _ from "lodash";
import { TodoProvider, UseTodoContext } from "./ToDoContext";
import { Button, Checkbox, Input } from "antd";
export default function index() {
  const Content = (props: any) => {
    const { data, dispatch } = UseTodoContext();
    const inputRef = useRef<any>();
    const itemRef = useRef<any>();
    return (
      <div>
        <Input
          style={{ width: 270, marginBottom: 20 }}
          ref={inputRef}
          placeholder="请输入事项名字"
          onPressEnter={(e: any) =>
            dispatch({ type: "add", data: { name: e?.target?.value } })
          }
        />
        <Button
          onClick={() => {
            dispatch({ type: "add", data: { name: inputRef?.current?.value } });
          }}
        >
          添加
        </Button>
        <div>
          {_.map(data?.list, (item) => {
            return (
              <div key={item?.id}>
                <Checkbox
                  onChange={(e) =>
                    dispatch({
                      type: "edit",
                      id: item?.id,
                      data: {done: e?.target?.checked},
                    })
                  }
                />
               {
                item?.isEdit ? <Input style={{width: 200, marginRight:8}} defaultValue={item?.name} ref={itemRef}/> : 
                <span style={{ margin: "0 12px" }}> {item?.name}</span>
               }
               
                <Button disabled style={{ marginRight: 8 }}>
                  {item?.done ? "已完成" : "待完成"}
                </Button>
                <Button style={{ marginRight:8 }} onClick={()=>{
                  const data = item?.isEdit ? { isEdit: false,name:itemRef?.current?.value} : { isEdit: true}
                   dispatch({
                    type: "edit",
                    id: item?.id,
                    data
                  })
                }}>{item?.isEdit ? "保存": "编辑"}</Button>
                <Button
                  onClick={() => dispatch({ type: "delete", id: item?.id })}
                >
                  删除
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <TodoProvider>
      <h2>这是一个列表</h2>
      <Content />
    </TodoProvider>
  );
}
