package com.skt.hrs.cmmn.exception;


public class HrsException extends RuntimeException
{
  private static final long serialVersionUID = 1L;
  private int errorCode;
  private String errorMessage;
  private String messageCode;

  public HrsException()
  {
  }

  public HrsException(int errorCode, Exception exeception)
  {
    this(errorCode, null, exeception);
  }

  public HrsException(int errorCode, String messageCode, Exception exeception) {
    this(errorCode, messageCode, null, exeception);
  }
  public HrsException(int errorCode, String messageCode, String errorMessage, Exception exeception) {
    super(errorMessage, exeception);
    this.errorCode = errorCode;
    this.messageCode = messageCode;
    this.errorMessage = errorMessage;
  }

  public HrsException(String s)
  {
    super(s);
  }

  public HrsException(String s, Exception exeception)
  {
    super(s, exeception);
  }

  public int getErrorCode() {
    return this.errorCode;
  }

  public void setErrorCode(int errorCode) {
    this.errorCode = errorCode;
  }

  public String getMessageCode() {
    return this.messageCode;
  }

  public void setMessageCode(String messageCode) {
    this.messageCode = messageCode;
  }

  public String getErrorMessage() {
    return this.errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }
}
