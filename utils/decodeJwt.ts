export const decodeUserId = (jwt: string) => {
    const { id } = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
    return id;
}