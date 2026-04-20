from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsFarmerOrReadOnly
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer
from rest_framework.exceptions import PermissionDenied  

# ✅ View All Products (PUBLIC)
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsFarmerOrReadOnly]


# ✅ View Single Product (PUBLIC)
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"
    permission_classes = [permissions.AllowAny]


# ✅ Add Product (Farmer Only)
class AddProductView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "farmer":
            raise PermissionDenied("Only farmers can add products")

        serializer.save(farmer=user)


# ✅ Update Product (Farmer Only)
class UpdateProductView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        product = self.get_object()

        if request.user != product.farmer:
            return Response(
                {"error": "You can only update your own products"},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().update(request, *args, **kwargs)


# ✅ Delete Product (Farmer Only)
class DeleteProductView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    lookup_field = "id"
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()

        if request.user != product.farmer:
            return Response(
                {"error": "You can only delete your own products"},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().destroy(request, *args, **kwargs)


# ✅ Farmer Products (PUBLIC or can restrict if needed)
class FarmerProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        farmer_id = self.kwargs.get("farmer_id")
        return Product.objects.filter(farmer_id=farmer_id)