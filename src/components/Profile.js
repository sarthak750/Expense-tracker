function Profile() {
  const user = localStorage.getItem("username");
  const email = localStorage.getItem("userid");
  return (
    <div>
      <h1> User </h1>
      <h1> email </h1>
    </div>
  );
}

export default Profile;
