function ProfileCard({ user }) {
    const { name, role, avatarUrl } = user;
    return (
      <article style={{border:"1px solid #ddd", borderRadius:8, padding:12, maxWidth:320}}>
        <img src={avatarUrl} alt={name} width="80" height="80" />
        <h3>{name}</h3>
        <p>{role}</p>
      </article>
    );
  }
  export default ProfileCard;
  