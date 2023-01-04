export const useConfirm = () => {
  const confirmAction = (
    message = "정말로 그렇게 하시겠습니까?",
    resolve,
    reject
  ) => {
    if (window.confirm(message)) {
      resolve();
    } else {
      reject();
    }
  };
  return confirmAction;
};
