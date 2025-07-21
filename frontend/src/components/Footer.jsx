const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 bg-black/95 text-white">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm font-light">
          Developed by{" "}
          <span className="font-medium hover:text-green-600 transition-colors duration-300">
            <a href="https://github.com/keshavcoded" target="_blank">Shrikeshav</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
