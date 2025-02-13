export type Posts = readonly Post[]

export type Post = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
