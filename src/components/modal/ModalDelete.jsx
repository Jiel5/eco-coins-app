import ModalComponent from "./index";

const ModalDelete = ({
  children = null,
  modalIsOpenDelete,
  setModalIsOpenDelete,
  handleDelete,
  message,
  textButton = "Hapus",
}) => {
  const handleCloseModalDelete = () => {
    setModalIsOpenDelete(false);
  };

  return (
    <ModalComponent
      isOpen={modalIsOpenDelete}
      onRequestClose={handleCloseModalDelete}
    >
      <div className="flex flex-col gap-2 font-sans">
        <h2 className="text-xl font-medium font-sans">{message}</h2>
        {children}
        <div className="mt-3 justify-end flex gap-1">
          <button
            type="button"
            onClick={handleCloseModalDelete}
            className="bg-gray-700 text-white font-medium py-1 px-4 rounded-md font-sans"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white font-medium py-1 px-4 rounded-md font-sans"
          >
            {textButton}
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ModalDelete;
