export interface BaseMapper<Domain, DTO> {
    toDomain(): Domain
    toPersist(): DTO
}