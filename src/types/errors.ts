export interface BackendValidationError {
  detail: string
  source: Source
}

export interface Source {
  pointer: string
}
