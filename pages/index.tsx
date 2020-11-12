import { ChangeEvent, useState } from "react";
import tw, { styled } from "twin.macro";
import { localApiSegmentationCall } from "../lib/khmerLangUtil";

const Title = styled.h1`
  ${tw`text-3xl text-white text-center p-4`}
`;

const Main = styled.main`
  ${tw`bg-gray-900 min-h-screen`}
`;
const Label = styled.label`
  ${tw`text-3xl text-white`}
`;
const TextArea = styled.textarea`
  resize: none;
  ${tw`p-4`}
`;
const Button = styled.button`
  ${tw`bg-green-500 text-white font-bold p-4 rounded-b-lg`}
  ${tw`hover:bg-green-600`}
`;
const Home: React.FunctionComponent = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outputZWSP, setOutputZWSP] = useState("");

  const onInputAreaChanges = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };
  const onOutputAreaChanges = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOutput(event.target.value);
  };
  const submitToApi = async () => {
    if (!input) {
      console.log("Empty man fill some data");
    }
    const data = await localApiSegmentationCall({ input });
    console.log(data);
    setOutput(data.data.ws.commas_sentence);
  };

  const submitCommaText = async () => {
    const zwspText = output.replaceAll(",", "​");
    setOutputZWSP(zwspText);
  };
  return (
    <Main tw="p-4 flex flex-col">
      <Title>Khmer Segmentation Test</Title>
      <Label>Input Text</Label>
      <TextArea rows={10} onChange={onInputAreaChanges} />
      <Button onClick={submitToApi}>Submit</Button>
      <Label>Comma Separated Result Text</Label>
      <TextArea rows={10} value={output} onChange={onOutputAreaChanges} />
      <Button onClick={submitCommaText}>Change Comma To ZWSP</Button>
      <Label>Zero Space Final Result Text</Label>
      <TextArea rows={10} value={outputZWSP} onChange={onOutputAreaChanges} />
    </Main>
  );
};

export default Home;
