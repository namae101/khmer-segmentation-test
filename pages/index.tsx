import { ChangeEvent, useState } from "react";
import tw, { styled } from "twin.macro";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import Link from "next/link";
import { localApiSegmentationCall } from "../lib/khmerLangUtil";

const Title = styled.h1`
  ${tw`text-3xl text-white text-center p-4`}
`;

const Main = styled.main`
  ${tw`bg-gray-900 min-h-screen`}
`;
const Label = styled.label`
  ${tw`text-3xl text-white p-4`}
`;
const TextArea = styled.textarea`
  resize: none;
  ${tw`p-4`}
`;
const Button = styled.button`
  ${tw`bg-green-500 text-white font-bold p-4 rounded-b-lg mb-8`}
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
      toast.warn("Please Input Data / សូមបញ្ចូលទិន្នន័យ");
      return;
    }
    try {
      const response = await localApiSegmentationCall({ input });
      setOutput(response.data.data);
      setOutputZWSP("");
      toast.success("Success / ជោគជ័យ");
    } catch (e) {
      toast.error("Error / បរាជ័យ");
    }
  };

  const submitSemiColonText = async () => {
    const zwspText = output.replaceAll("|", "​");
    setOutputZWSP(zwspText);
    toast.success("Success / ជោគជ័យ");
  };
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(outputZWSP);
    toast.success("Copied / កូពីជោគជ័យ");
  };

  const titleText = "Khmer Segmentation Test / ការ​ធ្វើ​តេស​ការ​ផ្ដាច់​ពាក្យ";
  const inputLabelText = "Input Text / ប្រយោគ​ធាតុ​ចូល";
  const commaLabelText =
    "'|' Separated Result Text/ ប្រយោគ​ដែល​មាន​ពាក្យ​ផ្ដាច់​ដោយ​ '|'";
  const finalResultLabelText =
    "Zero Space Final Result Text / លទ្ធផល​នៃ​ការ​ផ្ដាច់​ពាក្យ";

  return (
    <Main tw="p-4 flex flex-col">
      <Head>
        <title>Khmer Segmentation Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Title>{titleText}</Title>
      <Label>{inputLabelText}</Label>
      <TextArea rows={10} onChange={onInputAreaChanges} />
      <Button onClick={submitToApi}>Submit / ផ្ដាច់ពាក្យ</Button>
      <Label>{commaLabelText}</Label>
      <TextArea
        rows={10}
        value={output}
        onChange={onOutputAreaChanges}
        tw="text-xl tracking-wider"
      />
      <Button onClick={submitSemiColonText}>
        Change Comma To ZWSP / ប្រូក្បៀសទៅជាទទេរ
      </Button>
      <Label>{finalResultLabelText}</Label>
      <TextArea rows={10} value={outputZWSP} tw="text-lg" />
      <Button onClick={copyToClipBoard}>Copy Result / កូពីលទ្ធផល</Button>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        draggable={false}
      />
      <p tw="text-lg text-center text-white font-bold">
        Thank To Bong Rina Buoy For his Pre-Trained Model
      </p>
      <Link href="https://github.com/namae101/khmer-segmentation-test">
        <p tw="font-bold text-blue-700 text-center cursor-pointer">
          Link To source Code
        </p>
      </Link>
    </Main>
  );
};

export default Home;
