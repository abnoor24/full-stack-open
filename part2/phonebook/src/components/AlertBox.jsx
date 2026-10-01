export default function AlertBox({ isShown, setIsShown }) {
  if (isShown.status === "true")
    setTimeout(
      () => setIsShown((prev) => ({ ...prev, status: "false" })),
      5000,
    );

  if (isShown.status === "true")
    return <h3 className="alert-box">{isShown.dialogue}</h3>;
  else if (isShown.status === "404")
    return <h3 className="error-box">{isShown.dialogue}</h3>;
}
