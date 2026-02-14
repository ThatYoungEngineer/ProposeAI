import ProposalGenerator from "../../components/proposal/ProposalGenerator";

const Home = ({ themeMode, onToggleTheme }) => {
  return (
    <ProposalGenerator themeMode={themeMode} onToggleTheme={onToggleTheme} />
  );
};

export default Home;
