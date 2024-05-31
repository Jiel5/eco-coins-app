const ModalComponent = ({ isOpen, onRequestClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[1px]">
      <div className="w-full max-w-md rounded-lg  bg-white p-6 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
