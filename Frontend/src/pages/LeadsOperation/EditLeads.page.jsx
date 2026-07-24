import { LeadsForm } from "../../components/Forms/LeadsForm.component.jsx";
import { Modal } from "../../components/Modals/Modal.component.jsx";
import { useUpdateLeadsDetailMutation } from "../../features/API/api.js";
import { useState } from "react";

export const EditLeads = ({isOpen, onClose, data}) => {
  console.log(data)
  const [editLead, { isLoading, isSuccess, error }] =
    useUpdateLeadsDetailMutation();

  const [form, setForm] = useState({
    clientName: data?.clientName ,
    projectInfo: data?.projectInfo,
    status: data?.status,
    source: data?.source,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    dealValue: data?.dealValue,
  });

  if (!isOpen) return null;

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const postApi = async () => {
      try {
        await editLead(form).unwrap();
        onClose();
      } catch (error) {
        console.log(error);
      }
    };

    postApi();
  }
  return (
    <Modal isOpen={isOpen}>
      <LeadsForm onChange={onChange} form={form} onClose={onClose} onSubmit={handleSubmit}/>
    </Modal>
  );
};
