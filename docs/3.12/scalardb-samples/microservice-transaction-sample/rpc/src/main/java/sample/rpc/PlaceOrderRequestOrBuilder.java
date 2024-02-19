// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: sample.proto

package sample.rpc;

public interface PlaceOrderRequestOrBuilder extends
    // @@protoc_insertion_point(interface_extends:rpc.PlaceOrderRequest)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>int32 customer_id = 1;</code>
   * @return The customerId.
   */
  int getCustomerId();

  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  java.util.List<sample.rpc.ItemOrder> 
      getItemOrderList();
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  sample.rpc.ItemOrder getItemOrder(int index);
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  int getItemOrderCount();
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  java.util.List<? extends sample.rpc.ItemOrderOrBuilder> 
      getItemOrderOrBuilderList();
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  sample.rpc.ItemOrderOrBuilder getItemOrderOrBuilder(
      int index);
}
