import "@/assets/layouts-styles/home-styles/home.css";

export const HomeView = () => {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          backgroundColor: "#708090",
          color: "#fff",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </h1>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};
