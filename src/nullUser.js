export const createNullUser = () => ({
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  displayName: "",
  iconFileId: "00000000-0000-0000-0000-000000000000",
  bot: false,
  state: 0,
  updatedAt: new Date().toISOString(),
  room: {
    type: "none"
  }
})
