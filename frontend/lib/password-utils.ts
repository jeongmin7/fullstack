import bcrypt from "bcryptjs";

export function saltAndHashPassword(password: string) {
  const saltsRound = 10;
  const salt = bcrypt.genSaltSync(saltsRound);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

//DB에 저장된 비밀번호와 사용자가 입력한 비밀번호를 비교
export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
