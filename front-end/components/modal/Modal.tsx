import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

import { FC } from "react";

interface InputField {
  label: string;
  placeholder: string;
  type?: string;
}

interface ActionButton {
  label: string;
  color?: "primary" | "secondary" | "danger" | "success";
  variant?: "flat" | "solid" | "outlined";
  onPress: () => void;
}

interface ModalProps {
  triggerButtonText: string;
  triggerButtonColor?: "primary" | "secondary" | "danger" | "success";
  title: string;
  inputs?: InputField[];
  showCheckbox?: boolean;
  checkboxLabel?: string;
  footerActions: ActionButton[];
  linkText?: string;
  linkHref?: string;
}

const FormModal: FC<ModalProps> = ({
  triggerButtonText,
  triggerButtonColor = "primary",
  title,
  inputs = [],
  showCheckbox = false,
  checkboxLabel = "Remember me",
  footerActions,
  linkText,
  linkHref,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color={triggerButtonColor}>
        {triggerButtonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {inputs.map((input, index) => (
                  <Input
                    key={index}
                    label={input.label}
                    placeholder={input.placeholder}
                    type={input.type || "text"}
                    variant="bordered"
                  />
                ))}
                {showCheckbox && (
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      {checkboxLabel}
                    </Checkbox>
                    {linkText && linkHref && (
                      <Link color="primary" href={linkHref} size="sm">
                        {linkText}
                      </Link>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {footerActions.map((action, index) => (
                  <Button
                    key={index}
                    color={action.color || "primary"}
                    variant={action.variant || "solid"}
                    onPress={action.onPress}
                  >
                    {action.label}
                  </Button>
                ))}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
