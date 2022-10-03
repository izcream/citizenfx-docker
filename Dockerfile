FROM ubuntu:latest as builder

ARG RUNTIME_URL

RUN apt update -y && apt install -y wget xz-utils
WORKDIR /server
RUN wget ${RUNTIME_URL}
RUN tar xf fx.tar.xz && rm fx.tar.xz

FROM ubuntu:latest

WORKDIR /server
COPY --from=builder /server /server