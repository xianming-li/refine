import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";

import { Typography, Button } from "antd";

import type { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <>
    <Show
    isLoading={isLoading}
    headerButtons={() => null}
    goBack={false}
    breadcrumb={false}
  >
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.title}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
      <Button
      type="primary"
      shape="round"
      onClick={() => {
        window.close();
      
        // 如果浏览器不允许关闭，就返回上一页
        setTimeout(() => {
          if (!window.closed) {
            window.history.back();
          }
        }, 100);
      }}
      style={{
        position: "fixed",
        right: 32,
        bottom: 32,
        zIndex: 1000,
      }}
    >
      关闭页面
    </Button>
     </>
  );
};
