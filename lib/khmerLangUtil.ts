/* eslint-disable camelcase */
import Axios, { AxiosResponse } from "axios";

interface segmentationInputProps {
  input: string;
}

export const KHMER_LANG_API_URL = "http://khmerlang.com/api/segment_words";

type KhmerLangWord = {
  val: string;
  term: string;
  pos: string;
};
type KhmerLangResponse = {
  ws: {
    words_list: KhmerLangWord[];
    zero_space_sentence: string;
    commas_sentence: string;
    count_not_km_word: number;
  };
};
export const khmerLangSegmentInputSentence = async ({
  input,
}: segmentationInputProps): Promise<AxiosResponse<KhmerLangResponse>> => {
  const data = { sentences: input };
  try {
    const res = await Axios.post(KHMER_LANG_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const localApiSegmentationCall = async ({
  input,
}: segmentationInputProps): Promise<AxiosResponse<KhmerLangResponse>> => {
  const data = { sentences: input };
  try {
    const res = await Axios.post("/api/segmentation", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const placeholderForSpellCheck = async () => {
  console.log("in spellcheck");
};
