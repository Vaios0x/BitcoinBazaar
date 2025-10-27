#!/bin/bash
# Script para probar el contrato gaming-nft-fixed

echo "🔍 Verificando sintaxis del contrato gaming-nft-fixed..."
clarinet check

echo ""
echo "🧪 Ejecutando pruebas del contrato..."
clarinet test

echo ""
echo "📋 Verificando despliegue del contrato..."
clarinet deployments check

echo ""
echo "✅ Verificación completada!"
