import ProposalGenerator from "../../components/proposal/ProposalGenerator";

const Home = ({ themeMode, onToggleTheme }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <ProposalGenerator themeMode={themeMode} onToggleTheme={onToggleTheme} />
    </div>
  );
};

export default Home;
