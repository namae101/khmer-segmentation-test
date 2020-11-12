import tw, { styled } from "twin.macro";

interface TitleProps {
  isBold?: boolean;
  isPrimary?: boolean;
}

const Title = styled.h1<TitleProps>(({ isBold, isPrimary }) => [
  tw`mt-5 ml-5 px-4 py-2 text-5xl`,
  // Ternary
  isBold ? tw`font-bold` : tw`font-semibold`,
  // Conditional Style
  isPrimary && tw`text-blue-500`,
]);

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <p>hello</p>
      <Title isBold>Title</Title>
      <Title isPrimary>Title</Title>
    </div>
  );
};

export default Home;
