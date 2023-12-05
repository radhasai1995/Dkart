import * as StyledDOM from "../styles";
import * as GlobalFixture from "@globalFixture";
const { LOGIN_BACKGROUND_IMG, LOGIN_OUTER_IMG } = GlobalFixture.MEDIA_FIXTURE_CONTENTS
const LoginLeftPage = () => {
  return (
    <StyledDOM.ImageWrapper
      style={{
        backgroundImage: `url(${LOGIN_OUTER_IMG}),
    url(${LOGIN_BACKGROUND_IMG})`,
      }}
    />
  );
};

export default LoginLeftPage;
export { LoginLeftPage };
