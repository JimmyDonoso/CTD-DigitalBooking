package com.dh.BookingDigital.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException exception){
        ApiException apiException = new ApiException(
                exception.getMessage(),
                exception.httpStatus,
                ZonedDateTime.now(ZoneId.of("UTC-3"))
        );

        return new ResponseEntity<>(apiException, exception.httpStatus);
    }
}
