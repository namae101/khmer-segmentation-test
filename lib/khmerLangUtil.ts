/* eslint-disable camelcase */
import Axios, { AxiosResponse } from "axios";

interface segmentationInputProps {
  input: string;
}

export const KHMER_LANG_API_URL = "https://khmer-segmentation-api.rover.narong.dev/predict";

type KhmerLangResponse = {
  "data": string;
};
export const khmerLangSegmentInputSentence = async ({
  input,
}: segmentationInputProps): Promise<AxiosResponse<KhmerLangResponse>> => {
  const data = { sentences: input };
  const res = await Axios.post(KHMER_LANG_API_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const localApiSegmentationCall = async ({
  input,
}: segmentationInputProps): Promise<AxiosResponse<KhmerLangResponse>> => {
  const data = { sentences: input };

  const res = await Axios.post("/api/segmentation", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const placeholderForSpellCheck = async () => {
  console.log("in spellcheck");
};
