
const ProfilePhoto = ({
    src,
    alt = "",
    width = "150"
}) =>
{
    return (
        <img
            src={src ?? "https://www.vill.ogasawara.tokyo.jp/wp-content/themes/ogasawara/img/access/no_image.png"}
            alt={alt}
            className="profile-image"
            width={width}
        />
    )
}

export default ProfilePhoto;