import { useMany,useNavigation } from "@refinedev/core";
import { useState } from "react";
import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  CreateButton
} from "@refinedev/antd";

import { Table ,Modal,Space,Button,Typography } from "antd";

import type { IPost, ICategory } from "../../interfaces";
import { PostEditModal } from "./editModal";

export const PostList = () => {
  const { showUrl } = useNavigation();
  const { tableProps } = useTable<IPost>();
  const [editId, setEditId] = useState<number | null>(null);
  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const {
    result: data,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List >
        {/* <CreateButton hideText size="small"  /> */}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }
          
            const category = data?.data.find((item) => item.id === value);
          
            return (
              <Typography.Link   onClick={() => window.open(showUrl("posts", value), "_blank")}>
                {category?.title}
              </Typography.Link>
            );
          }}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              {/* <EditButton hideText size="small" recordItemId={record.id} /> */}
              <Button
  size="small"
  onClick={() => setEditId(record.id)}
>
  Edit
</Button>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <Modal
        open={editId !== null}
        onCancel={() => setEditId(null)}
        footer={null}
        destroyOnHidden
      >
        {editId !== null && (
          <PostEditModal
            id={editId}
            onClose={() => setEditId(null)}
          />
        )}
      </Modal>
    </List>

  );
};
