import { useMutation } from "react-query";
import { createArticle } from "@/services/articleApi";
import { createSize } from "@/services/sizeApi";
import { createModel, createModelFromPlatform } from "@/services/modelApi";

export const useCreateData = () => {
  const { mutateAsync: addArticle } = useMutation(postArticle);
  const { mutateAsync: addSize } = useMutation(postSize);
  const { mutateAsync: addModel } = useMutation(postModel);
  const { mutateAsync: addModelFromPlatform } = useMutation(postPlatformModel);

  return {
    addArticle,
    addSize,
    addModel,
    addModelFromPlatform,
  };
};