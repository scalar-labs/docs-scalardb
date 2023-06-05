// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: sample.proto

package sample.rpc;

/**
 * Protobuf type {@code rpc.PlaceOrderRequest}
 */
public final class PlaceOrderRequest extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:rpc.PlaceOrderRequest)
    PlaceOrderRequestOrBuilder {
private static final long serialVersionUID = 0L;
  // Use PlaceOrderRequest.newBuilder() to construct.
  private PlaceOrderRequest(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private PlaceOrderRequest() {
    itemOrder_ = java.util.Collections.emptyList();
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new PlaceOrderRequest();
  }

  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return sample.rpc.Sample.internal_static_rpc_PlaceOrderRequest_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return sample.rpc.Sample.internal_static_rpc_PlaceOrderRequest_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            sample.rpc.PlaceOrderRequest.class, sample.rpc.PlaceOrderRequest.Builder.class);
  }

  public static final int CUSTOMER_ID_FIELD_NUMBER = 1;
  private int customerId_ = 0;
  /**
   * <code>int32 customer_id = 1;</code>
   * @return The customerId.
   */
  @java.lang.Override
  public int getCustomerId() {
    return customerId_;
  }

  public static final int ITEM_ORDER_FIELD_NUMBER = 2;
  @SuppressWarnings("serial")
  private java.util.List<sample.rpc.ItemOrder> itemOrder_;
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  @java.lang.Override
  public java.util.List<sample.rpc.ItemOrder> getItemOrderList() {
    return itemOrder_;
  }
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  @java.lang.Override
  public java.util.List<? extends sample.rpc.ItemOrderOrBuilder> 
      getItemOrderOrBuilderList() {
    return itemOrder_;
  }
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  @java.lang.Override
  public int getItemOrderCount() {
    return itemOrder_.size();
  }
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  @java.lang.Override
  public sample.rpc.ItemOrder getItemOrder(int index) {
    return itemOrder_.get(index);
  }
  /**
   * <code>repeated .rpc.ItemOrder item_order = 2;</code>
   */
  @java.lang.Override
  public sample.rpc.ItemOrderOrBuilder getItemOrderOrBuilder(
      int index) {
    return itemOrder_.get(index);
  }

  private byte memoizedIsInitialized = -1;
  @java.lang.Override
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) return true;
    if (isInitialized == 0) return false;

    memoizedIsInitialized = 1;
    return true;
  }

  @java.lang.Override
  public void writeTo(com.google.protobuf.CodedOutputStream output)
                      throws java.io.IOException {
    if (customerId_ != 0) {
      output.writeInt32(1, customerId_);
    }
    for (int i = 0; i < itemOrder_.size(); i++) {
      output.writeMessage(2, itemOrder_.get(i));
    }
    getUnknownFields().writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (customerId_ != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeInt32Size(1, customerId_);
    }
    for (int i = 0; i < itemOrder_.size(); i++) {
      size += com.google.protobuf.CodedOutputStream
        .computeMessageSize(2, itemOrder_.get(i));
    }
    size += getUnknownFields().getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof sample.rpc.PlaceOrderRequest)) {
      return super.equals(obj);
    }
    sample.rpc.PlaceOrderRequest other = (sample.rpc.PlaceOrderRequest) obj;

    if (getCustomerId()
        != other.getCustomerId()) return false;
    if (!getItemOrderList()
        .equals(other.getItemOrderList())) return false;
    if (!getUnknownFields().equals(other.getUnknownFields())) return false;
    return true;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    hash = (37 * hash) + CUSTOMER_ID_FIELD_NUMBER;
    hash = (53 * hash) + getCustomerId();
    if (getItemOrderCount() > 0) {
      hash = (37 * hash) + ITEM_ORDER_FIELD_NUMBER;
      hash = (53 * hash) + getItemOrderList().hashCode();
    }
    hash = (29 * hash) + getUnknownFields().hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static sample.rpc.PlaceOrderRequest parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  public static sample.rpc.PlaceOrderRequest parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }

  public static sample.rpc.PlaceOrderRequest parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static sample.rpc.PlaceOrderRequest parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  @java.lang.Override
  public Builder newBuilderForType() { return newBuilder(); }
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  public static Builder newBuilder(sample.rpc.PlaceOrderRequest prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  @java.lang.Override
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder() : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  /**
   * Protobuf type {@code rpc.PlaceOrderRequest}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:rpc.PlaceOrderRequest)
      sample.rpc.PlaceOrderRequestOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return sample.rpc.Sample.internal_static_rpc_PlaceOrderRequest_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return sample.rpc.Sample.internal_static_rpc_PlaceOrderRequest_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              sample.rpc.PlaceOrderRequest.class, sample.rpc.PlaceOrderRequest.Builder.class);
    }

    // Construct using sample.rpc.PlaceOrderRequest.newBuilder()
    private Builder() {

    }

    private Builder(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      super(parent);

    }
    @java.lang.Override
    public Builder clear() {
      super.clear();
      bitField0_ = 0;
      customerId_ = 0;
      if (itemOrderBuilder_ == null) {
        itemOrder_ = java.util.Collections.emptyList();
      } else {
        itemOrder_ = null;
        itemOrderBuilder_.clear();
      }
      bitField0_ = (bitField0_ & ~0x00000002);
      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return sample.rpc.Sample.internal_static_rpc_PlaceOrderRequest_descriptor;
    }

    @java.lang.Override
    public sample.rpc.PlaceOrderRequest getDefaultInstanceForType() {
      return sample.rpc.PlaceOrderRequest.getDefaultInstance();
    }

    @java.lang.Override
    public sample.rpc.PlaceOrderRequest build() {
      sample.rpc.PlaceOrderRequest result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public sample.rpc.PlaceOrderRequest buildPartial() {
      sample.rpc.PlaceOrderRequest result = new sample.rpc.PlaceOrderRequest(this);
      buildPartialRepeatedFields(result);
      if (bitField0_ != 0) { buildPartial0(result); }
      onBuilt();
      return result;
    }

    private void buildPartialRepeatedFields(sample.rpc.PlaceOrderRequest result) {
      if (itemOrderBuilder_ == null) {
        if (((bitField0_ & 0x00000002) != 0)) {
          itemOrder_ = java.util.Collections.unmodifiableList(itemOrder_);
          bitField0_ = (bitField0_ & ~0x00000002);
        }
        result.itemOrder_ = itemOrder_;
      } else {
        result.itemOrder_ = itemOrderBuilder_.build();
      }
    }

    private void buildPartial0(sample.rpc.PlaceOrderRequest result) {
      int from_bitField0_ = bitField0_;
      if (((from_bitField0_ & 0x00000001) != 0)) {
        result.customerId_ = customerId_;
      }
    }

    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof sample.rpc.PlaceOrderRequest) {
        return mergeFrom((sample.rpc.PlaceOrderRequest)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(sample.rpc.PlaceOrderRequest other) {
      if (other == sample.rpc.PlaceOrderRequest.getDefaultInstance()) return this;
      if (other.getCustomerId() != 0) {
        setCustomerId(other.getCustomerId());
      }
      if (itemOrderBuilder_ == null) {
        if (!other.itemOrder_.isEmpty()) {
          if (itemOrder_.isEmpty()) {
            itemOrder_ = other.itemOrder_;
            bitField0_ = (bitField0_ & ~0x00000002);
          } else {
            ensureItemOrderIsMutable();
            itemOrder_.addAll(other.itemOrder_);
          }
          onChanged();
        }
      } else {
        if (!other.itemOrder_.isEmpty()) {
          if (itemOrderBuilder_.isEmpty()) {
            itemOrderBuilder_.dispose();
            itemOrderBuilder_ = null;
            itemOrder_ = other.itemOrder_;
            bitField0_ = (bitField0_ & ~0x00000002);
            itemOrderBuilder_ = 
              com.google.protobuf.GeneratedMessageV3.alwaysUseFieldBuilders ?
                 getItemOrderFieldBuilder() : null;
          } else {
            itemOrderBuilder_.addAllMessages(other.itemOrder_);
          }
        }
      }
      this.mergeUnknownFields(other.getUnknownFields());
      onChanged();
      return this;
    }

    @java.lang.Override
    public final boolean isInitialized() {
      return true;
    }

    @java.lang.Override
    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      if (extensionRegistry == null) {
        throw new java.lang.NullPointerException();
      }
      try {
        boolean done = false;
        while (!done) {
          int tag = input.readTag();
          switch (tag) {
            case 0:
              done = true;
              break;
            case 8: {
              customerId_ = input.readInt32();
              bitField0_ |= 0x00000001;
              break;
            } // case 8
            case 18: {
              sample.rpc.ItemOrder m =
                  input.readMessage(
                      sample.rpc.ItemOrder.parser(),
                      extensionRegistry);
              if (itemOrderBuilder_ == null) {
                ensureItemOrderIsMutable();
                itemOrder_.add(m);
              } else {
                itemOrderBuilder_.addMessage(m);
              }
              break;
            } // case 18
            default: {
              if (!super.parseUnknownField(input, extensionRegistry, tag)) {
                done = true; // was an endgroup tag
              }
              break;
            } // default:
          } // switch (tag)
        } // while (!done)
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        throw e.unwrapIOException();
      } finally {
        onChanged();
      } // finally
      return this;
    }
    private int bitField0_;

    private int customerId_ ;
    /**
     * <code>int32 customer_id = 1;</code>
     * @return The customerId.
     */
    @java.lang.Override
    public int getCustomerId() {
      return customerId_;
    }
    /**
     * <code>int32 customer_id = 1;</code>
     * @param value The customerId to set.
     * @return This builder for chaining.
     */
    public Builder setCustomerId(int value) {

      customerId_ = value;
      bitField0_ |= 0x00000001;
      onChanged();
      return this;
    }
    /**
     * <code>int32 customer_id = 1;</code>
     * @return This builder for chaining.
     */
    public Builder clearCustomerId() {
      bitField0_ = (bitField0_ & ~0x00000001);
      customerId_ = 0;
      onChanged();
      return this;
    }

    private java.util.List<sample.rpc.ItemOrder> itemOrder_ =
      java.util.Collections.emptyList();
    private void ensureItemOrderIsMutable() {
      if (!((bitField0_ & 0x00000002) != 0)) {
        itemOrder_ = new java.util.ArrayList<sample.rpc.ItemOrder>(itemOrder_);
        bitField0_ |= 0x00000002;
       }
    }

    private com.google.protobuf.RepeatedFieldBuilderV3<
        sample.rpc.ItemOrder, sample.rpc.ItemOrder.Builder, sample.rpc.ItemOrderOrBuilder> itemOrderBuilder_;

    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public java.util.List<sample.rpc.ItemOrder> getItemOrderList() {
      if (itemOrderBuilder_ == null) {
        return java.util.Collections.unmodifiableList(itemOrder_);
      } else {
        return itemOrderBuilder_.getMessageList();
      }
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public int getItemOrderCount() {
      if (itemOrderBuilder_ == null) {
        return itemOrder_.size();
      } else {
        return itemOrderBuilder_.getCount();
      }
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public sample.rpc.ItemOrder getItemOrder(int index) {
      if (itemOrderBuilder_ == null) {
        return itemOrder_.get(index);
      } else {
        return itemOrderBuilder_.getMessage(index);
      }
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder setItemOrder(
        int index, sample.rpc.ItemOrder value) {
      if (itemOrderBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        ensureItemOrderIsMutable();
        itemOrder_.set(index, value);
        onChanged();
      } else {
        itemOrderBuilder_.setMessage(index, value);
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder setItemOrder(
        int index, sample.rpc.ItemOrder.Builder builderForValue) {
      if (itemOrderBuilder_ == null) {
        ensureItemOrderIsMutable();
        itemOrder_.set(index, builderForValue.build());
        onChanged();
      } else {
        itemOrderBuilder_.setMessage(index, builderForValue.build());
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder addItemOrder(sample.rpc.ItemOrder value) {
      if (itemOrderBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        ensureItemOrderIsMutable();
        itemOrder_.add(value);
        onChanged();
      } else {
        itemOrderBuilder_.addMessage(value);
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder addItemOrder(
        int index, sample.rpc.ItemOrder value) {
      if (itemOrderBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        ensureItemOrderIsMutable();
        itemOrder_.add(index, value);
        onChanged();
      } else {
        itemOrderBuilder_.addMessage(index, value);
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder addItemOrder(
        sample.rpc.ItemOrder.Builder builderForValue) {
      if (itemOrderBuilder_ == null) {
        ensureItemOrderIsMutable();
        itemOrder_.add(builderForValue.build());
        onChanged();
      } else {
        itemOrderBuilder_.addMessage(builderForValue.build());
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder addItemOrder(
        int index, sample.rpc.ItemOrder.Builder builderForValue) {
      if (itemOrderBuilder_ == null) {
        ensureItemOrderIsMutable();
        itemOrder_.add(index, builderForValue.build());
        onChanged();
      } else {
        itemOrderBuilder_.addMessage(index, builderForValue.build());
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder addAllItemOrder(
        java.lang.Iterable<? extends sample.rpc.ItemOrder> values) {
      if (itemOrderBuilder_ == null) {
        ensureItemOrderIsMutable();
        com.google.protobuf.AbstractMessageLite.Builder.addAll(
            values, itemOrder_);
        onChanged();
      } else {
        itemOrderBuilder_.addAllMessages(values);
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder clearItemOrder() {
      if (itemOrderBuilder_ == null) {
        itemOrder_ = java.util.Collections.emptyList();
        bitField0_ = (bitField0_ & ~0x00000002);
        onChanged();
      } else {
        itemOrderBuilder_.clear();
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public Builder removeItemOrder(int index) {
      if (itemOrderBuilder_ == null) {
        ensureItemOrderIsMutable();
        itemOrder_.remove(index);
        onChanged();
      } else {
        itemOrderBuilder_.remove(index);
      }
      return this;
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public sample.rpc.ItemOrder.Builder getItemOrderBuilder(
        int index) {
      return getItemOrderFieldBuilder().getBuilder(index);
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public sample.rpc.ItemOrderOrBuilder getItemOrderOrBuilder(
        int index) {
      if (itemOrderBuilder_ == null) {
        return itemOrder_.get(index);  } else {
        return itemOrderBuilder_.getMessageOrBuilder(index);
      }
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public java.util.List<? extends sample.rpc.ItemOrderOrBuilder> 
         getItemOrderOrBuilderList() {
      if (itemOrderBuilder_ != null) {
        return itemOrderBuilder_.getMessageOrBuilderList();
      } else {
        return java.util.Collections.unmodifiableList(itemOrder_);
      }
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public sample.rpc.ItemOrder.Builder addItemOrderBuilder() {
      return getItemOrderFieldBuilder().addBuilder(
          sample.rpc.ItemOrder.getDefaultInstance());
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public sample.rpc.ItemOrder.Builder addItemOrderBuilder(
        int index) {
      return getItemOrderFieldBuilder().addBuilder(
          index, sample.rpc.ItemOrder.getDefaultInstance());
    }
    /**
     * <code>repeated .rpc.ItemOrder item_order = 2;</code>
     */
    public java.util.List<sample.rpc.ItemOrder.Builder> 
         getItemOrderBuilderList() {
      return getItemOrderFieldBuilder().getBuilderList();
    }
    private com.google.protobuf.RepeatedFieldBuilderV3<
        sample.rpc.ItemOrder, sample.rpc.ItemOrder.Builder, sample.rpc.ItemOrderOrBuilder> 
        getItemOrderFieldBuilder() {
      if (itemOrderBuilder_ == null) {
        itemOrderBuilder_ = new com.google.protobuf.RepeatedFieldBuilderV3<
            sample.rpc.ItemOrder, sample.rpc.ItemOrder.Builder, sample.rpc.ItemOrderOrBuilder>(
                itemOrder_,
                ((bitField0_ & 0x00000002) != 0),
                getParentForChildren(),
                isClean());
        itemOrder_ = null;
      }
      return itemOrderBuilder_;
    }
    @java.lang.Override
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.setUnknownFields(unknownFields);
    }

    @java.lang.Override
    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.mergeUnknownFields(unknownFields);
    }


    // @@protoc_insertion_point(builder_scope:rpc.PlaceOrderRequest)
  }

  // @@protoc_insertion_point(class_scope:rpc.PlaceOrderRequest)
  private static final sample.rpc.PlaceOrderRequest DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new sample.rpc.PlaceOrderRequest();
  }

  public static sample.rpc.PlaceOrderRequest getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<PlaceOrderRequest>
      PARSER = new com.google.protobuf.AbstractParser<PlaceOrderRequest>() {
    @java.lang.Override
    public PlaceOrderRequest parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      Builder builder = newBuilder();
      try {
        builder.mergeFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        throw e.setUnfinishedMessage(builder.buildPartial());
      } catch (com.google.protobuf.UninitializedMessageException e) {
        throw e.asInvalidProtocolBufferException().setUnfinishedMessage(builder.buildPartial());
      } catch (java.io.IOException e) {
        throw new com.google.protobuf.InvalidProtocolBufferException(e)
            .setUnfinishedMessage(builder.buildPartial());
      }
      return builder.buildPartial();
    }
  };

  public static com.google.protobuf.Parser<PlaceOrderRequest> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<PlaceOrderRequest> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public sample.rpc.PlaceOrderRequest getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

