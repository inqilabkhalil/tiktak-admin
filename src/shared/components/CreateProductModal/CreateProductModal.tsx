import { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

import { mockCategories } from '../../../features/categories/utils/mockCategories';

import styles from './CreateProductModal.module.css';

interface CreateProductModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  unit: string;
  categoryId: number;
}

const UNIT_OPTIONS = [
  { value: 'eded', label: 'Ədəd' },
  { value: 'kg', label: 'Kiloqram' },
  { value: 'litr', label: 'Litr' },
];

export const CreateProductModal = ({ open, onCancel, onSuccess }: CreateProductModalProps) => {
  const [form] = Form.useForm<ProductFormValues>();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const handleSubmit = async (values: ProductFormValues) => {
    setLoading(true);
    try {
      // TODO: productsService.createProduct(values, fileList[0]) çağırılacaq
      console.log('Yeni məhsul:', values, fileList[0]);

      message.success('Məhsul uğurla əlavə olundu');
      form.resetFields();
      setFileList([]);
      onSuccess();
    } catch (error) {
      message.error('Məhsul yaradılarkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className={styles.modal}
      title={<span className={styles.title}>Yeni Məhsul</span>}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.form}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Məhsul Adı"
          rules={[{ required: true, message: 'Məhsulun adını daxil edin' }]}
        >
          <Input placeholder="Məhsulun adını daxil edin" className={styles.input} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Açıqlama"
          rules={[{ required: true, message: 'Məhsulun açıqlamasını yazın' }]}
        >
          <Input.TextArea
            placeholder="Məhsulun açıqlamasını yazın"
            className={styles.textarea}
            rows={4}
          />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            name="price"
            label="Qiymət"
            rules={[{ required: true, message: 'Qiyməti daxil edin' }]}
            className={styles.col}
          >
            <InputNumber
              placeholder="Qiymət daxil edin"
              className={styles.numberInput}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="unit"
            label="Ölçü Vahidi"
            rules={[{ required: true, message: 'Vahid seçin' }]}
            className={styles.col}
          >
            <Select
              placeholder="Vahid"
              className={styles.select}
              options={UNIT_OPTIONS}
            />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            name="categoryId"
            label="Kateqoriya"
            rules={[{ required: true, message: 'Kateqoriya seçin' }]}
            className={styles.col}
          >
            <Select
              placeholder="Kateqoriya seçin"
              className={styles.select}
              options={mockCategories.map((c) => ({ value: c.id, label: c.title }))}
            />
          </Form.Item>

          <Form.Item label="Məhsul Şəkli" className={styles.col}>
            <Upload
              fileList={fileList}
              onChange={({ fileList: newList }) => setFileList(newList)}
              beforeUpload={() => false}
              maxCount={1}
              showUploadList={false}
            >
              <div className={styles.uploadTrigger}>
                <span className={styles.uploadText}>
                  {fileList[0]?.name ?? 'Şəkil seçin...'}
                </span>
                <UploadOutlined />
              </div>
            </Upload>
          </Form.Item>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className={styles.submitButton}
          block
        >
          Mahsulu Yarat
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;