import { useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button } from "antd";
import MDEditor from "@uiw/react-md-editor";

export const PostEditModal = ({ id, onClose }) => {
  const {
    formProps,
    saveButtonProps,
  } = useForm({
    resource: "posts",
    action: "edit",
    id,
    redirect: false,
    onMutationSuccess: () => onClose(),
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...categorySelectProps} />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select
          options={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Content" name="content">
        <MDEditor data-color-mode="light" />
      </Form.Item>

      <Button type="primary" {...saveButtonProps}>
        Save
      </Button>
    </Form>
  );
};