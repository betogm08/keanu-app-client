export type KeanuImage = {
    getKeanuImage: string
};

export type KeanuImageResponse = {
    data: KeanuImage
}

export type Payload = {
    width: number
    height?: number
    option?: string
}
  
export type Action = {
    type: string;
    payload: Payload;
}

export type Error = {
    message: string,
    code: string
}

export type KeanuState = {
    error: Error,
    keanuImage: KeanuImageResponse,
    options: Payload
}

export type KeanuReducer = {
    keanu: KeanuState
}