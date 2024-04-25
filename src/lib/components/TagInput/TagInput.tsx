import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  tag: string;
}

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
  formLabel?: string;
}

export const TagInput: React.FC<Props> = ({ tags, setTags, formLabel }) => {
  const toast = useToast();

  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ tag }) => {
    if (tags.includes(tag)) {
      toast({
        title: "Tag already exists",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const newTags = [...tags, tag];
    setTags(newTags);
    setValue("tag", "");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  return (
    <FormControl>
      {formLabel && <FormLabel>{formLabel}</FormLabel>}
      <Stack>
        {tags && (
          <Wrap>
            {tags.map((tag) => (
              <Tag key={tag}>
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeTag(tag)} />
              </Tag>
            ))}
          </Wrap>
        )}
        <InputGroup>
          <Input {...register("tag")} variant="filled" />
          <InputRightElement width="4.5rem">
            <Button onClick={handleSubmit(onSubmit)} h="1.75rem" size="sm">
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
    </FormControl>
  );
};
